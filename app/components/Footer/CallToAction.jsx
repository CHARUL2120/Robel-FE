import React from 'react';
import { Button } from '../ui/button';
import { MoveRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <div>
      <section className="h-full w-full ">
        <div className="container flex items-start flex-wrap gap-y-10 justify-between bg-[#283845] rounded-[20px] p-10">
          <div>
            <p className="text-3xl sm:text-5xl md:text-6xl text-white font-eulogy tracking-[3%] font-normal mb-2.5">
              Ready to Transform Your Space?
            </p>
            <p className="font-urbanist text-white text-base lg:text-xl font-light mt-5">
              Get a personalized quote or request samples to see the brilliance
              of our acrylic laminates up close.
            </p>
          </div>
          <Button className="text-base lg:text-2xl text-white font-medium m-0 rounded-lg px-6 py-3  font-urbanist flex gap-2.5">
            Get a Free Quote
            <MoveRight size={24} strokeWidth={3} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
