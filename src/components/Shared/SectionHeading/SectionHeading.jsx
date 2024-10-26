/* eslint-disable react/prop-types */
export default function SectionHeading({ title, subTitle }) {
  return (
    <div className="text-center py-12">
      <h1 className="text-5xl font-semibold uppercase text-gray-800">
        {title}
      </h1>
      <div className="divider w-1/3 mx-auto"></div>
      <p className="text-lg text-gray-600 mt-4">{subTitle}</p>
    </div>
  );
}
