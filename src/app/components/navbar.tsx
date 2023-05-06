import React, { useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
var dbrainslogo = "./public/brainOfBrains.jpg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Modal from "./login";

const navigation = [
  { name: "Projects Dashboard", href: "/projects-dashboard", current: true },
  { name: "DBrains DAO", href: "/dbrains-dao", current: false },
  /* { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false }, */
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [IsLoginOpen, setIsLoginOpen] = useState(false);
  const [IsSignupOpen, setIsSignupOpen] = useState(false);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <Modal show={IsLoginOpen}>
            <button
            className="rounded-full bg-gray-300 w-[2rem] h-[2rem] scale-[0.8]"
              onClick={() => {
                setIsLoginOpen(false);
              }}
            >
              <XMarkIcon className="scale-[0.8]"/>
            </button>
            <p className="text-xl mb-4 font-bold">Login</p>
            <div className="w-11/12 flex flex-col">
              <form className="flex flex-col" action="">
                <label>Username</label>
                <input
                  type="text"
                  name="p-name"
                  placeholder="Username"
                  required
                  className="w-11/12 p-2 outline-blue-500 border-2 border-blue-400 rounded-md m-2 mx-0 mb-4"
                />
                <label>Password</label>
                <input
                  type="password"
                  name="p-name"
                  placeholder="Password"
                  required
                  className="w-11/12 p-2 outline-blue-500 border-2 border-blue-400 rounded-md m-2 mx-0 mb-4"
                />
                <button className="bg-blue-400 rounded-md w-11/12 p-2 font-bold">
                  Login
                </button>
                <p className="p-2">Dont have an account ? <a className="text-blue-500 underline cursor-pointer" onClick={() => {setIsLoginOpen(false); setIsSignupOpen(true)}}>Register</a></p>
              </form>
            </div>
          </Modal>
          <Modal show={IsSignupOpen}>
            <button
            className="rounded-full bg-gray-300 w-[2rem] h-[2rem] scale-[0.8]"
              onClick={() => {
                setIsSignupOpen(false);
              }}
            >
              <XMarkIcon className="scale-[0.8]"/>
            </button>
            <p className="text-xl mb-4 font-bold">Register</p>
            <div className="w-full justify-center items-center flex flex-col">
              <form className=" w-10/12 flex flex-col" action="">
                <label>Username</label>
                <input
                  type="text"
                  name="p-name"
                  placeholder="Username"
                  required
                  className="w-11/12 p-2 outline-blue-500 border-2 border-blue-400 rounded-md m-2 mx-0 mb-4"
                />
                <label>Create Password</label>
                <input
                  type="password"
                  name="p-name"
                  placeholder="Password"
                  required
                  className="w-11/12 p-2 outline-blue-500 border-2 border-blue-400 rounded-md m-2 mx-0 mb-4"
                />
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="p-name"
                  placeholder="Password"
                  required
                  className="w-11/12 p-2 outline-blue-500 border-2 border-blue-400 rounded-md m-2 mx-0 mb-4"
                />
                <button className="bg-blue-400 rounded-md w-11/12 p-2 font-bold">
                  Register
                </button>
                <p className="p-2">Already have an account ? <a className="text-blue-500 underline cursor-pointer" onClick={() => {setIsLoginOpen(true); setIsSignupOpen(false)}}>Login</a></p>
              </form>
            </div>
          </Modal>

          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center  sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/home">
                    <Image
                      className="block h-8 w-auto lg:hidden"
                      src="/DBrains.jpg"
                      width={10}
                      height={10}
                      alt="DBrains"
                    />
                  </Link>
                  <Link href="/">
                    {" "}
                    <Image
                      className="hidden h-8 w-auto lg:block"
                      src="/DBrains.jpg"
                      width={10}
                      height={10}
                      alt="DBrains"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <button
                className="p-2 bg-blue-500 w-[6rem] m-2 rounded-md text-white font-bold"
                onClick={() => {
                  setIsLoginOpen(true);
                }}
              >
                Login
              </button>
              <div className="hidden sm:p-5 sm:block">
                <ConnectButton />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
