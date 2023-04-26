import { create } from "ipfs-http-client";

const ipfs = create(new URL("http://localhost:5001"));

export default ipfs;
