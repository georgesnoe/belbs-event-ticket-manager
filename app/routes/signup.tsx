import { type SubmitEventHandler, useState } from "react";
import { Link } from "react-router";
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
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const onFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
	};

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Créez votre compte</CardTitle>
							<CardDescription>
								Connectez-vous avec votre compte Google
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form method="post" onSubmit={onFormSubmit}>
								<FieldGroup>
									<Field>
										<Button variant="outline" type="button">
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
										</Button>
									</Field>
									<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
										Ou continuez avec
									</FieldSeparator>
									<Field>
										<FieldLabel htmlFor="name">
											Votre nom complet{" "}
											<span className="text-destructive">*</span>
										</FieldLabel>
										<Input
											id="name"
											type="text"
											placeholder="Jean Toto"
											value={name}
											onChange={(e) => setName(e.target.value)}
											required
										/>
									</Field>
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
											required
										/>
									</Field>
									<Field>
										<Field className="grid grid-cols-1 gap-4">
											<Field
												data-invalid={
													password.length >= 1 && password.length < 8
												}
											>
												<FieldLabel htmlFor="password">
													Votre mot de passe{" "}
													<span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													id="password"
													type="password"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													required
												/>
												<FieldError
													errors={[
														password.length >= 1 && password.length < 8
															? {
																	message:
																		"Le mot de passe doit contenir au moins 8 caractères",
																}
															: undefined,
													]}
												/>
											</Field>
											<Field
												data-invalid={
													password.length >= 1 && password !== confirmPassword
												}
											>
												<FieldLabel htmlFor="confirm-password">
													Confirmez votre mot de passe{" "}
													<span className="text-destructive">*</span>
												</FieldLabel>
												<Input
													id="confirm-password"
													type="password"
													value={confirmPassword}
													onChange={(e) => setConfirmPassword(e.target.value)}
													required
												/>
												<FieldError
													errors={[
														password.length >= 1 && password !== confirmPassword
															? {
																	message:
																		"Les mots de passe ne correspondent pas",
																}
															: undefined,
													]}
												/>
											</Field>
										</Field>
										<FieldDescription>
											Le mot de passe doit contenir au moins 8 caractères.
										</FieldDescription>
									</Field>
									<Field>
										<Button type="submit">Créez un compte</Button>
										<FieldDescription className="text-center">
											Vous avez déja un compte?{" "}
											<Link to="/login">Connectez-vous</Link>
										</FieldDescription>
									</Field>
								</FieldGroup>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
