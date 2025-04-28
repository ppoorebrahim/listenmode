import CommentBox from "@/components/CommentBox";

export default function CommentTestPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <CommentBox />
      </div>
    </div>
  );
}
