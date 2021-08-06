import React from "react";

import { Select, Plus, Trash } from "handsome-ui";

interface Props {
  tags: Array<string>;
  availableTags: Array<string>;
  onUpdateTags: (newTags: Array<string>) => void;
  limit?: number;
  minimum?: number;
  error?: string;
}

const TagSection: React.FunctionComponent<Props> = (props: Props) => {
  const { tags, availableTags } = props;

  const _getUnselectedTags = (selectedTag?: string): Array<string> => {
    let filteredTags = availableTags.filter((tag) => !tags.includes(tag));

    if (selectedTag) {
      filteredTags = [...filteredTags, selectedTag];
    }

    return filteredTags;
  };

  const _handleUpdateTags = (i: number, newTag: string): void => {
    const { onUpdateTags } = props;

    const newTags = [...tags];
    newTags.splice(i, 1, newTag);
    onUpdateTags(newTags);
  };

  const _handleRemoveTag = (i: number): void => {
    const { onUpdateTags } = props;

    const newTags = [...tags];
    newTags.splice(i, 1);
    onUpdateTags(newTags);
  };

  const _handleAddTag = () => {
    const { onUpdateTags } = props;

    onUpdateTags([...tags, ""]);
  };

  const _renderRemoveTag = (tagIndex: number): React.ReactNode => {
    const { minimum = 0 } = props;

    const canRemoveTags = tags.length > minimum;

    const modifier = canRemoveTags ? "" : "disabled";

    return (
      <Trash
        className={`admin_add-remove ${modifier}`}
        onClick={canRemoveTags ? () => _handleRemoveTag(tagIndex) : () => null}
        width={25}
        height={25}
      />
    );
  };

  const _renderCurrentTags = (): React.ReactNode => {
    const { minimum = 0 } = props;

    return (
      <div className="admin_active-tags">
        {tags.map((tag, i) => (
          <div className="admin_tag-row" key={`tag_${i}`}>
            <Select
              containerClasses="admin_tag-select"
              label={`Tag ${i + 1}${i + 1 <= minimum ? "*" : ""}`}
              options={_getUnselectedTags(tag)}
              value={tag}
              onChange={(value: string) => _handleUpdateTags(i, value)}
            />
            {_renderRemoveTag(i)}
          </div>
        ))}
      </div>
    );
  };

  const _renderAddTags = (): React.ReactNode => {
    const { limit = availableTags.length } = props;

    const canAddTags = tags.length < limit;

    if (canAddTags) {
      return (
        <Plus
          className="admin_add-remove"
          onClick={_handleAddTag}
          width={15}
          height={15}
        />
      );
    }

    return null;
  };

  const _renderErrorSection = (): React.ReactNode => {
    const { error } = props;

    if (error) {
      return <div className="admin_tag-error">{error}</div>;
    }

    return null;
  };

  return (
    <div className="admin_tag-section">
      {_renderCurrentTags()}
      {_renderAddTags()}
      {_renderErrorSection()}
    </div>
  );
};

export default TagSection;
