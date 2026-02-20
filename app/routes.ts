import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/api/auth/*", "routes/api.auth.$.ts"),
	route("/login", "routes/login.tsx"),
	route("/signup", "routes/signup.tsx"),
	layout("layouts/admin.tsx", [
		route("/admin/dashboard", "routes/admin.dashboard.tsx"),
		route("/admin/users", "routes/admin.users.tsx"),
		route("/admin/events", "routes/admin.activities.tsx"),
		route("/admin/participations", "routes/admin.participations.tsx"),
		route("/admin/scan-qr", "routes/admin.scan-qr.tsx"),
		route("/admin/settings", "routes/admin.settings.tsx"),
	]),
] satisfies RouteConfig;
