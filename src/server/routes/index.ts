/**
 * Index "Router"
 *
 * This seperates all routes on the site into their own files
 * for organizational convention
 *
 * The "/" route is the "root" router
 *
 * All else are as expected
 */

export { default as root }  from "./root";
export { default as lobby } from "./lobby";
export { default as chat } from "./chat";
export { default as auth }  from "./auth";

export { default as test }  from "./test";
