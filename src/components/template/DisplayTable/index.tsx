import { headerTable } from "@/app/bdd/page";

export default function DisplayTable({
    children,
    content,
}: Readonly<{ children: React.ReactNode; content: headerTable }>) {
    return (
        <div className="mx-8 my-6">
            <div className="">
                <div className="font-bold text-xl">{content.title}</div>
                <div className="font-thin text-sm text-gray-500">
                    {content.description}
                </div>
            </div>
            <div className="pt-6">{children}</div>
        </div>
    );
}
