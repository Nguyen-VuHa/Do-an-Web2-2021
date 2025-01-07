
const CinemaDetailRightContent = () => {
  return (
    <div className='bg-second h-fit rounded-circle-md overflow-hidden p-1 col-span-2'>
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4375999130884!2d105.7751005761375!3d21.015169580630797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454aa0fed56c7%3A0x1ba275bf03d4c1a9!2sThe%20Garden%20Shopping%20Center!5e0!3m2!1sen!2s!4v1736213936896!5m2!1sen!2s"
        className="w-full rounded-circle-md"
        height="350"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
  )
}

export default CinemaDetailRightContent