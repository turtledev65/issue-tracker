"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" }
  ];

  return (
    <nav className="border-b mb-5 py-3 px-5">
      <Container>
        <Flex justify="between" gap="6">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`${
                      currentPath === link.href
                        ? "text-zinc-900"
                        : "text-zinc-500"
                    } hover:text-zinc-800 transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.name}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
