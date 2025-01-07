import Link from "next/link";
import React from "react";
import CinemaCard from "~/components/common/CinemaCard";
import { ICinema } from "~/types/cinema.type";

interface CinemaItemProps {
  data: ICinema;
}

const CinemaItem: React.FC<CinemaItemProps> = ({ data }) => {
  return (
    <Link href={`he-thong-rap/${data.slug}`} prefetch={false}>
      <CinemaCard data={data} />
    </Link>
  );
};

export default CinemaItem;
