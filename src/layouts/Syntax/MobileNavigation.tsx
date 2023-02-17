import { Dialog } from "@headlessui/react";
import { useState } from "react";

import { Logomark } from "./Logo";
import { Navigation } from "./Navigation";

function MenuIcon(props: any) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon(props: any) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  );
}

export function MobileNavigation({ navigation }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="w-6 h-6 stroke-slate-500" />
      </button>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="fixed inset-0 z-50 flex items-start pr-10 overflow-y-auto bg-slate-900/50 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="w-full max-w-xs min-h-full px-4 pt-5 pb-12 bg-white dark:bg-slate-900 sm:px-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="w-6 h-6 stroke-slate-500" />
            </button>
            <a href="/" className="ml-6" aria-label="Home page">
              <Logomark className="overflow-hidden rounded-full h-9 w-9" />
            </a>
          </div>
          <Navigation className="px-1 mt-5" navigation={navigation} />
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
