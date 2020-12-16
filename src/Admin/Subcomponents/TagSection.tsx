import React from "react";

import { Row, Select } from "handsome-ui";

interface Props {
  tags: Array<string>;
  availableTags: Array<string>;
  onUpdateTags: (newTags: Array<string>) => void;
}

const TagSection: React.FunctionComponent<Props> = (props: Props) => {
  const { tags, availableTags } = props;

  const _handleUpdateTags = (i: number, newTag: string) => {
    const { onUpdateTags } = props;

    const newTags = [...tags];
    newTags.splice(i, 1, newTag);
    onUpdateTags(newTags);
  };

  const _handleRemoveTag = (i: number) => {
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
              options={availableTags}
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
    const canAddTags = availableTags.find((tag) => !tags.includes(tag));

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
