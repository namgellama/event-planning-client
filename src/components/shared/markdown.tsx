import ReactMarkdown from "react-markdown";

const Markdown = ({ body }: { body: string }) => {
    return (
        <ReactMarkdown
            components={{
                h1: ({ children }) => (
                    <h1 className="mb-4 text-3xl font-bold">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-2xl font-bold">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="mb-2 mt-5 text-xl font-semibold">
                        {children}
                    </h3>
                ),
                p: ({ children }) => (
                    <p className="mb-4 text-[15px] leading-7 text-[#4A4238]">
                        {children}
                    </p>
                ),
                ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-1 pl-6 text-[15px] leading-7 text-[#4A4238]">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-1 pl-6 text-[15px] leading-7 text-[#4A4238]">
                        {children}
                    </ol>
                ),
                li: ({ children }) => <li className="pl-1">{children}</li>,
                strong: ({ children }) => (
                    <strong className="font-semibold text-[#1F2933]">
                        {children}
                    </strong>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="my-4 border-l-4 border-[#D8CFBC] pl-4 italic text-[#8B8378]">
                        {children}
                    </blockquote>
                ),
            }}
        >
            {body}
        </ReactMarkdown>
    );
};

export default Markdown;
