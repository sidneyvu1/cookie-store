export default function Footer() {
  return (
    <footer className="relative mt-auto w-full">
      <img
        src="/footer.svg"
        alt=""
        className="w-full block"
        aria-hidden="true"
      />
      <div className="bg-[#1E5DD2] text-center py-4 text-sm text-[#FFFF]">
        © {new Date().getFullYear()} Cookie Store. All rights reserved.
      </div>
    </footer>
  )
}