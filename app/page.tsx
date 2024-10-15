import { Button } from '@chakra-ui/react';
import { signIn } from '@/app/lib/auth';

export default function Home() {
	return (
		<form
			action={async () => {
				"use server"
				await signIn("discord", { redirectTo: "/home" });
			}}
		>
			<Button type="submit">Sign in with Discord</Button>
		</form>
	);
}
