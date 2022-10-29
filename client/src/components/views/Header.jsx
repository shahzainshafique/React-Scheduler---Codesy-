const Header = ({ mentor }) => {
  return (
    <div class="flex w-full flex-row py-5 px-3 lg:w-3/12">
      <div class="relative flex flex-col">
        <div class="flex h-12 w-12 flex-shrink-0 flex-col justify-center rounded-full bg-slate-200 bg-opacity-50 dark:bg-slate-600">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=128&h=128&q=60&facepad=1.5"
            class="z-10 h-12 w-12 rounded-full object-cover shadow hover:shadow-xl"
            alt="Rocky Balboa"
          />
          <span class="absolute right-0 top-0 z-20 flex h-3 w-3">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
        </div>
      </div>

      <div class="ml-4 self-center overflow-x-hidden">
        <div class="w-full truncate text-xl font-bold leading-5 tracking-tight">
          {mentor.name}
        </div>
        <div class="text-sm text-slate-500">Timezone {mentor.time_zone}</div>
      </div>
    </div>
  );
};

export default Header;
