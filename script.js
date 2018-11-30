import http from "k6/http";
import { sleep } from "k6";

export let options = {
	vus: 1000,
	duration: "1s",
};

export default function() {
    http.get("http://localhost:9000/9888");
    sleep(1);
};     