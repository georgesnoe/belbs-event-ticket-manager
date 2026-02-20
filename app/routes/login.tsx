import { type SubmitEventHandler, useState } from "react";
import { Form, Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";
import { authClient } from "~/lib/auth-client.client";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoginProgress, setIsLoginProgress] = useState(false);
	const [isEmailLoginProgress, setIsEmailLoginProgress] = useState(false);
	const [isGoogleLoginProgress, setIsGoogleLoginProgress] = useState(false);

	const onFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		authClient.signIn.email(
			{ email, password, rememberMe: true },
			{
				onRequest: () => {
					setIsLoginProgress(true);
					setIsEmailLoginProgress(true);
				},
				onError: () => {
					setIsLoginProgress(false);
					setIsEmailLoginProgress(false);
				},
			},
		);
	};

	const onGoogleLogin = () => {
		authClient.signIn.social(
			{ provider: "google" },
			{
				onRequest: () => {
					setIsLoginProgress(true);
					setIsGoogleLoginProgress(true);
				},
				onError: () => {
					setIsLoginProgress(false);
					setIsGoogleLoginProgress(false);
				},
			},
		);
	};

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Bon retour</CardTitle>
							<CardDescription>
								Connectez-vous avec votre compte Google
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form onSubmit={onFormSubmit}>
								<FieldGroup>
									<Field>
										<Button
											variant="outline"
											type="button"
											onClick={onGoogleLogin}
											disabled={isLoginProgress}
										>
											{isGoogleLoginProgress ? (
												<Spinner />
											) : (
												<>
													<svg
														aria-label="Google Logo"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
													>
														<path
															d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
															fill="currentColor"
														/>
													</svg>
													Se connecter avec Google
												</>
											)}
										</Button>
									</Field>
									<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
										Ou continuez avec
									</FieldSeparator>
									<Field>
										<FieldLabel htmlFor="email">
											Votre adresse email{" "}
											<span className="text-destructive">*</span>
										</FieldLabel>
										<Input
											id="email"
											type="email"
											placeholder="nom@exemple.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											disabled={isLoginProgress}
											required
										/>
									</Field>
									<Field>
										<div className="flex items-center">
											<FieldLabel htmlFor="password">
												Votre mot de passe{" "}
												<span className="text-destructive">*</span>
											</FieldLabel>
										</div>
										<Input
											id="password"
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											disabled={isLoginProgress}
											required
										/>
									</Field>
									<Field>
										<Button type="submit" disabled={isLoginProgress}>
											{isEmailLoginProgress ? <Spinner /> : "Se connecter"}
										</Button>
										<FieldDescription className="text-center">
											Vous n'avez pas de compte?{" "}
											<Link to="/signup">Créez un compte</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</Form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
