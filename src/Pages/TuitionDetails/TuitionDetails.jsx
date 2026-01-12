import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  MdCategory,
  MdOutlineSubject,
  MdOutlineAvTimer,
  MdDateRange,
} from "react-icons/md";
import { BiLogoDiscourse, BiCategoryAlt } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { VscSymbolMethod } from "react-icons/vsc";
import { TbMoneybag, TbWorld } from "react-icons/tb";
import { PiStudent, PiCity } from "react-icons/pi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { FaRegObjectUngroup, FaLocationDot } from "react-icons/fa6";
import {
  FaFileSignature,
  FaRegAddressCard,
  FaArrowRight,
} from "react-icons/fa";
import useRole from "./../../hooks/useRole";
import ApplyModal from "../../Components/ApplyModal/ApplyModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [tuition, setTuition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const { role, isLoading: roleLoading } = useRole();

  useEffect(() => {
    let isMounted = true;

    const fetchTuition = async () => {
      try {
        const { data } = await axiosSecure.get(`/tuitions/${id}`);
        if (isMounted) setTuition(data);
      } catch (error) {
        console.error("Failed to fetch tuition:", error);
        if (isMounted) setTuition(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTuition();
    return () => (isMounted = false);
  }, [id, axiosSecure]);

  if (roleLoading || loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!tuition)
    return (
      <p className="min-h-screen flex justify-center items-center">
        Tuition not found
      </p>
    );

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans transition-colors duration-300 min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-text-light-main dark:text-text-dark-main">
            Tuition Details
          </h1>
        </div>

        <section className="bg-card-light dark:bg-card-dark shadow-sm rounded-2xl p-6 sm:p-8 transition-colors duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4">
            <Item
              icon={<MdCategory />}
              label="Category"
              value={tuition.category}
            />

            <Item
              icon={<BiLogoDiscourse />}
              label="Course"
              value={tuition.course}
            />

            <Item
              icon={<MdOutlineSubject />}
              label="Subject"
              value={tuition.subject}
            />

            <Item icon={<LuCalendarDays />} label="Days" value={tuition.days} />

            <Item
              icon={<MdOutlineAvTimer />}
              label="Time"
              value={tuition.time}
            />

            <Item
              icon={<GiSandsOfTime />}
              label="Duration"
              value={tuition.duration}
            />

            <Item
              icon={<VscSymbolMethod />}
              label="Method"
              value={tuition.method}
            />

            <Item
              icon={<TbMoneybag />}
              label="Salary"
              value={`${tuition.salary} TK`}
            />

            <Item
              icon={<PiStudent />}
              label="Students"
              value={tuition.students}
            />

            <Item
              icon={<BsGenderAmbiguous />}
              label="Gender"
              value={tuition.gender}
            />
          </div>
        </section>

        <section className="bg-card-light dark:bg-card-dark shadow-sm rounded-2xl p-6 sm:p-8 transition-colors duration-300">
          <h2 className="text-xl font-bold text-blue-600 mb-8 border-b dark:border-gray-700 pb-4">
            Tutor Requirements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4 mb-8">
            <Item
              icon={<BiCategoryAlt />}
              label="Category"
              value={tuition.requirements?.category}
            />

            <Item
              icon={<FaRegObjectUngroup />}
              label="Group"
              value={tuition.requirements?.group}
            />

            <Item
              icon={<BsGenderAmbiguous />}
              label="Gender"
              value={tuition.requirements?.gender}
            />

            <Item
              icon={<MdDateRange />}
              label="Hiring From"
              value={tuition.requirements?.hiring_from}
            />
          </div>

          <div className="flex items-start space-x-3 bg-background-light dark:bg-slate-700/50 p-2 rounded-xl">
            <div className="mt-0.5 text-blue-600 text-xl">
              <FaFileSignature />
            </div>
            <div>
              <p className="text-sm font-bold text-text-light-main dark:text-text-dark-main mb-1">
                Other Requirement
              </p>
              <p className="text-sm text-text-light-sub dark:text-text-dark-sub leading-relaxed">
                {tuition.requirements?.other}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card-light dark:bg-card-dark shadow-sm rounded-2xl p-6 sm:p-8 transition-colors duration-300">
          <h2 className="text-xl font-bold text-blue-600 mb-8 border-b dark:border-gray-700 pb-4">
            Contact Informations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 mb-8">
            <Item
              icon={<TbWorld />}
              label="Country"
              value={tuition.contact?.country}
            />

            <Item
              icon={<PiCity />}
              label="City"
              value={tuition.contact?.city}
            />

            <Item
              icon={<FaLocationDot />}
              label="Location"
              value={tuition.contact?.location}
            />
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 p-1 text-blue-600 text-xl">
              <FaRegAddressCard />
            </div>
            <div>
              <p className="text-sm font-bold text-text-light-main dark:text-text-dark-main">
                Full Address
              </p>
              <p className="text-sm text-text-light-sub dark:text-text-dark-sub mt-1">
                {tuition.contact?.address}
              </p>
            </div>
          </div>
        </section>

        <div className="pt-4 pb-8 w-full flex justify-center">
          {role?.role === "tutor" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-12 rounded-xl shadow-lg transition-transform transform active:scale-95 focus:outline-none w-full sm:w-auto text-lg flex items-center justify-center gap-2"
            >
              Apply Now
              <span className="text-sm">
                <FaArrowRight />
              </span>
            </button>
          ) : (
            <button
              className="bg-blue-300 text-white font-semibold py-3.5 px-12 rounded-xl shadow-lg focus:outline-none w-full sm:w-auto text-lg flex items-center justify-center gap-2"
              title="Only tutors can apply"
              disabled
            >
              For Tutor
              <span className="text-sm">
                <FaArrowRight />
              </span>
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <ApplyModal tuition={tuition} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const Item = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="mt-1 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600">
      <span className="text-xl">{icon}</span>
    </div>
    <div>
      <p className="text-sm font-semibold text-text-light-main dark:text-text-dark-main">
        {label}
      </p>
      <p className="text-sm text-text-light-sub dark:text-text-dark-sub">
        {value}
      </p>
    </div>
  </div>
);

export default TuitionDetails;
