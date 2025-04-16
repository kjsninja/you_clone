interface PageProps {
    params: Promise<{ videoId: string }>
}


export default async function VideoIdPage({ params }: PageProps) {
    const { videoId } = await params;
    return (
        <div>Video Id Page {videoId} </div>
    );
}