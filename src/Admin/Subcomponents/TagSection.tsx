import React from "react";

import { Row, Select } from "handsome-ui";

interface Props {
  tags: Array<string>;
  availableTags: Array<string>;
  onUpdateTags: (newTags: Array<string>) => void;
  limit?: number;
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

  const _renderCurrentTags = (): React.ReactNode => {
    return (
      <div className="admin_active-tags">
        {tags.map((tag, i) => (
          <Row key={`tag_${i}`}>
            <Select
              containerClasses="admin_tag-select"
              label={`Tag ${i + 1}`}
              options={_getUnselectedTags(tag)}
              value={tag}
              onChange={(value: string) => _handleUpdateTags(i, value)}
            />
            <div
              className="admin_add-remove"
              onClick={() => _handleRemoveTag(i)}
            >
              Remove
            </div>
          </Row>
        ))}
      </div>
    );
  };

  const _renderAddTags = (): React.ReactNode => {
    const { limit = 100 } = props;

    const canAddTags =
      tags.length < limit && availableTags.find((tag) => !tags.includes(tag));

    if (canAddTags) {
      return (
        <div className="admin_add-remove" onClick={_handleAddTag}>
          Add Tag
        </div>
      );
    }

    return null;
  };

  return (
    <div className="admin_tag-section">
      {_renderCurrentTags()}
      {_renderAddTags()}
    </div>
  );
};

export default TagSection;
