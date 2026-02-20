import {
	ActivityIcon,
	CircleUserRoundIcon,
	EllipsisVerticalIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	PresentationIcon,
	ScanQrCodeIcon,
	SettingsIcon,
	ShowerHeadIcon,
	UsersIcon,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	useSidebar,
} from "~/components/ui/sidebar";
import { Spinner } from "~/components/ui/spinner";
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/admin";

export function loader({ request }: Route.LoaderArgs) {
	return auth.api.getSession({
		headers: request.headers,
	});
}

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
	const links = {
		navLinks: [
			{
				url: "/admin/dashboard",
				label: "Dashboard",
				icon: <LayoutDashboardIcon />,
			},
			{
				url: "/admin/users",
				label: "Utilisateurs",
				icon: <UsersIcon />,
			},
			{
				url: "/admin/events",
				label: "Activités",
				icon: <ActivityIcon />,
			},
			{
				url: "/admin/participations",
				label: "Participations",
				icon: <PresentationIcon />,
			},
			{
				url: "/admin/scan-qr",
				label: "Scanner un QR Code",
				icon: <ScanQrCodeIcon />,
			},
		],
		userLinks: [
			{
				url: "/admin/settings",
				label: "Paramètres",
				icon: <SettingsIcon />,
			},
		],
	};

	const { isMobile } = useSidebar();
	const user = loaderData?.user;
	const location = useLocation();

	return (
		<>
			<Sidebar collapsible="offcanvas" variant="inset">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								asChild
								className="data-[slot=sidebar-menu-button]:!p-1.5"
							>
								<Link to="/">
									<ShowerHeadIcon className="!size-5" />
									<span className="text-base font-semibold">
										BeLBS Event Admin
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="flex flex-col gap-2">
							<SidebarMenu>
								{links.navLinks.map((link) => (
									<NavLink key={link.label} to={link.url}>
										{({ isPending }) => (
											<SidebarMenuItem>
												<SidebarMenuButton tooltip={link.label}>
													{isPending ? <Spinner /> : link.icon && link.icon}
													<span>{link.label}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										)}
									</NavLink>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup className="mt-auto">
						<SidebarGroupContent>
							<SidebarMenu>
								{links.userLinks.map((link) => (
									<SidebarMenuItem key={link.label}>
										<SidebarMenuButton asChild>
											<a href={link.url}>
												{link.icon && link.icon}
												<span>{link.label}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuButton
										size="lg"
										className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
									>
										<Avatar className="h-8 w-8 rounded-lg grayscale">
											<AvatarImage
												src={user?.image ?? "/assets/images/avatar.png"}
												alt={user?.name}
											/>
											<AvatarFallback className="rounded-lg">
												User
											</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">{user?.name}</span>
											<span className="text-muted-foreground truncate text-xs">
												{user?.email}
											</span>
										</div>
										<EllipsisVerticalIcon className="ml-auto size-4" />
									</SidebarMenuButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
									side={isMobile ? "bottom" : "right"}
									align="end"
									sideOffset={4}
								>
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="h-8 w-8 rounded-lg">
												<AvatarImage
													src={user?.image ?? "/assets/images/avatar.png"}
													alt={user?.name}
												/>
												<AvatarFallback className="rounded-lg">
													CN
												</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-medium">
													{user?.name}
												</span>
												<span className="text-muted-foreground truncate text-xs">
													{user?.email}
												</span>
											</div>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<CircleUserRoundIcon />
											Mon Compte
										</DropdownMenuItem>
										{/* <DropdownMenuItem> */}
										{/* 	<BellIcon /> */}
										{/* 	Mes Notifications */}
										{/* </DropdownMenuItem> */}
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<LogOutIcon className="text-destructive" />
										<span className="text-destructive">Se déconnecter</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
					<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mx-2 data-[orientation=vertical]:h-4"
						/>
						<h1 className="text-base font-medium">
							{
								links.navLinks.find((link) => link.url === location.pathname)
									?.label
							}
						</h1>
						<div className="ml-auto flex items-center gap-2">
							<Button
								variant="ghost"
								asChild
								size="sm"
								className="hidden sm:flex"
							>
								<NavLink to="/admin/scan-qr" className="dark:text-foreground">
									{({ isPending }) => (
										<>
											{isPending && <Spinner />}
											Scanner un code QR
										</>
									)}
								</NavLink>
							</Button>
						</div>
					</div>
				</header>
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
							<Outlet />
						</div>
					</div>
				</div>
			</SidebarInset>
		</>
	);
}
