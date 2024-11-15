import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SUPERADMIN_CREDENTIALS } from "@/lib/constants";
import { deleteTokenCookie } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const { code } = router.query;
  const [data, setData] = useState<{
    email: string;
    name: string;
    createdAt: Date;
  } | null>(null);

  const isLoggedIn = data !== null;

  // Exclusive login path for BRIDev
  const fetchData = async () => {
    // try {
    //   const response = await fetch("/api/bri-login", {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ code }),
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     let credData = null;
    //     if (data.data.email === SUPERADMIN_CREDENTIALS.email) {
    //       credData = {
    //         ...SUPERADMIN_CREDENTIALS,
    //         createdAt: new Date(),
    //       };
    //       setData(credData);
    //     } else {
    //       credData = data.data;
    //       setData(data.data);
    //     }
    //     localStorage.setItem("data", JSON.stringify(credData));
    //     // Remove query code from url
    //     router.push({ pathname: router.pathname, query: {} }, undefined, {
    //       shallow: true,
    //     });
    //   } else {
    //     console.error("Failed to fetch data");
    //     // Redirect to https://bridev.qore.run
    //     router.push("http://localhost:5173");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    router.push({ pathname: router.pathname, query: {} }, undefined, {
      shallow: true,
    });
  };

  const deleteCookie = async () => {
    try {
      await deleteTokenCookie();
    } catch (error) {
      console.error(error);
    }
  };

  const randomLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        let credData = null;
        if (data.success) {
          credData = {
            ...data.user,
            createdAt: new Date(),
          };
          setData(credData);
        } else {
          credData = data.user;
          setData(data.user);
        }
        localStorage.setItem("data", JSON.stringify(credData));
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await deleteTokenCookie();
      localStorage.removeItem("data");
      setData(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUserfromLocalStorage = localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data") as string)
      : null;

    if (!getUserfromLocalStorage) {
      deleteCookie();
    }

    setData(getUserfromLocalStorage);
  }, []);

  useEffect(() => {
    if (router.query.code) {
      fetchData();
    }
  }, [router.query.code]);
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        {data?.name ? `Hi, ${data?.name}` : "Who are you ?"}
      </motion.h1>
      {!isLoggedIn ? (
        <motion.button
          onClick={randomLogin}
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-white px-4 py-2 rounded-md dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Login
        </motion.button>
      ) : (
        <motion.button
          onClick={logOut}
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-red-500 px-4 py-2 rounded-md text-white dark:bg-red-600 dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Logout
        </motion.button>
      )}
    </LampContainer>
  );
}
