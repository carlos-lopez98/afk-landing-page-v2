function Footer() {
    return (<footer className="w-full py-8 bg-[#2A4747] text-white">
        <div className="container mx-auto px-4 text-center">
            <p className="text-sm opacity-80">
                © {new Date().getFullYear()} AFK Friends. All rights reserved.
            </p>
            <div className="mt-2 space-x-4 text-sm opacity-60">
                <a href="#" className="hover:underline">
                    Privacy Policy
                </a>
                <a href="#" className="hover:underline">
                    Terms of Service
                </a>
            </div>
        </div>
    </footer>
    )
};

export default Footer;
