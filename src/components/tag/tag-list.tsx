import { TagListContent, TagListHeader } from ".";

const TagList = () => {
    return (
        <div className="space-y-5 max-w-4xl mx-auto">
            <TagListHeader />
            <TagListContent />
        </div>
    );
};

export default TagList;
