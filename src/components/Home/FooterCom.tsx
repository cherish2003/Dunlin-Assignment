import React from "react";

const FooterCom = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 backdrop-blur-lg border-t border-black">
      <div className="container flex flex-col items-center justify-center md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ By
          <a
            href="https://github.com/cherish2003"
            target="_blank"
            rel="noreferrer"
            className="ml-2 font-medium underline underline-offset-4"
          >
            Cherish
          </a>
        </p>
      </div>
    </footer>
  );
};

export default FooterCom;
