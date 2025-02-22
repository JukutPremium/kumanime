
import Link from 'next/link';
import { IoIosSearch } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";
export default function searchExample() {

    return (
        <>
            <section className="w-screen h-screen bg-[#141519] flex justify-center items-center">
                <div className="flex items-center space-x-4">

                    <Link href='..'>
                        <HiOutlineXMark className="text-white text-4xl" />
                    </Link>

                    <input
                        className="border-b-2 border-white bg-transparent focus:outline-none text-white w-96 h-10 text-2xl"
                        type="text" placeholder="Search..."
                    />

                    <Link href='/jkt-components/coming-soon'>
                        <IoIosSearch className="text-white text-4xl" />
                    </Link>
                </div>
            </section>

        </>
    );
}