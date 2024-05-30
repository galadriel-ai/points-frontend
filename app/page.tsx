import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import GaladrielLogo from '@/public/assets/galadriel-logo.png';

export default function Home() {
  return (
    <main className="w-full flex justify-center items-center max-w-[120rem] min-w-[20rem] min-h-dvh px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16 overflow-clip">
      <div className="bg-[#054EC94D] w-80 flex flex-col justify-center items-center gap-5 px-5 py-10 rounded-lg border border-[#0D5FEA] shadow-sm backdrop-blur-3xl">
        <Image
          src={GaladrielLogo}
          alt="Galadriel Logo"
          className="w-52 py-2.5"
        />
        <Button
          className="font-neuebit mx-auto h-auto w-auto max-md:w-full px-10 bg-primary-foreground text-primary hover:bg-primary-hover rounded-none text-4xl max-sm:2xl max-md:text-3xl font-medium shadow-md"
          asChild
        >
          <Link
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/x/login`}
          >
            Connect your X
          </Link>
        </Button>
      </div>
    </main>
  );
}
