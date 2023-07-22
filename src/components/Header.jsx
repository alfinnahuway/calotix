import { Navbar as NavbarBase, Button } from "flowbite-react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
	return (
		<NavbarBase fluid rounded className="!bg-slate-200 sticky top-0 !rounded-none z-[9999]">
			<NavbarBase.Brand href="https://flowbite-react.com">
				<img alt="Flowbite React Logo" className="mr-3 h-6 sm:h-9" src="./public/logo.svg" />
				<span className="self-center whitespace-nowrap text-xl font-semibold text-black">Calo.Tix</span>
			</NavbarBase.Brand>
			<div className="flex md:order-2">
				<div className="hidden md:flex">
					<Icon icon={faMagnifyingGlass} size="lg" className="mr-4" />
					<Icon icon={faUser} size="lg" />
				</div>
				<NavbarBase.Toggle />
			</div>
			<NavbarBase.Collapse>
				<div className="flex gap-2 md:hidden">
					<Button outline color="warning" className="flex-1">
						Daftar
					</Button>
					<Button color="warning" className="flex-1">
						Masuk
					</Button>
				</div>
				<NavbarBase.Link href="#" className="text-base !text-gray-900">
					Home
				</NavbarBase.Link>
				<NavbarBase.Link href="#" className="text-base !text-gray-900">
					Event
				</NavbarBase.Link>
				<NavbarBase.Link href="#" className="text-base !text-gray-900">
					Schedule
				</NavbarBase.Link>
				<NavbarBase.Link href="#" className="text-base !text-gray-900">
					About us
				</NavbarBase.Link>
			</NavbarBase.Collapse>
		</NavbarBase>
	);
};

export default Navbar;
