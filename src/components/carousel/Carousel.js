import React, { forwardRef } from "react";
import CarouselItem from "./CarouselItem";

const Carousel = forwardRef((props, ref) => {
  // const loading = props.loading;
  const { data } = props;
  // console.log(data);
  return (
    <div
      ref={ref}
      className="w-[100%] px-2 py-6 flex overflow-scroll lg:overflow-hidden gap-4 lg:gap-6 mt-6 scrollbar-none"
    >
      {data.map((item) => {
        return <CarouselItem data={item} key={item.id} />;
      })}
    </div>
  );
});

export default Carousel;
