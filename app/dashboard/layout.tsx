import Image from 'next/image';

import GVector from '@/public/assets/home/leaderboard-g.svg';

import Footer from '../common/footer';
import DesktopNav from '../common/navbar';
import DashboardHero from './_components/dashboard-hero';

export default function Quests({ content }: { content: React.ReactNode }) {
  return (
    <>
      {/* TODO: Temporarily added nav and footer here */}
      <DesktopNav />
      <main className="relative w-full max-w-[120rem] min-w-[20rem]">
        {/* main contents */}
        <div className="flex flex-col">
          <DashboardHero />

          {/* content */}
          <div className="relative overflow-y-clip">
            <div className="relative z-20">{content}</div>
            <Image
              src={GVector}
              alt="G vector"
              className="absolute top-52 left-0 z-10 bg-cover w-full px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
