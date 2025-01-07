
interface CinemaDetailRightContentProps {
  embed_url: string;
}

const CinemaDetailRightContent: React.FC<CinemaDetailRightContentProps> = ({
  embed_url
}) => {
  return (
    <div className="bg-second h-fit rounded-circle-md overflow-hidden p-1 col-span-2">
      <iframe
        src={embed_url}
        className="w-full rounded-circle-md"
        height="350"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default CinemaDetailRightContent;
