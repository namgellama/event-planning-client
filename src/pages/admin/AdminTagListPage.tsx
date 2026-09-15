import { TagListContent, TagListHeader } from "@/components/tag";

const AdminTagListPage = () => {
    return (
        <div className="space-y-5 max-w-4xl mx-auto">
            <TagListHeader />
            <TagListContent />
        </div>
    );
};

export default AdminTagListPage;
