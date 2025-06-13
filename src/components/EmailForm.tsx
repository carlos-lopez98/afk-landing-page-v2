import React, { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateForm, FormData, formatLocation } from "@/utils/validation"

const apiUrl = import.meta.env.VITE_GOOGLE_API_URL;

const EmailForm = ({ onSubmitted }: { onSubmitted?: () => void }) => {
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [customLocation, setCustomLocation] = useState("");

    const laCountyCities = [
        "Los Angeles",
        "San Francisco Bay Area",
        "New York City",
        "Chicago",
        "Seattle",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        const formData: FormData = {
            email,                // comes from user typing into email field
            location,
            customLocation     // comes from user selecting dropdow       // comes from optional text input (you can start with empty string if no input yet)
        };

        const formattedLocation = formatLocation(location, customLocation);
        const validationResult = validateForm(formData);

        if (!validationResult.isValid) {
            setStatus("error");
            setMessage(validationResult.errors.join(" "));
            return;
        }


        try {
            setStatus("loading");
            setMessage("");

            //Not needed for now
            //const formattedLocation = formatLocation(location, customLocation);

            const response = await fetch(
                `${apiUrl}/exec/exec?email=${encodeURIComponent(email)}&location=${encodeURIComponent(formattedLocation)}`,
                {
                    method: "GET",
                }
            );

            //Response from API
            const data = await response.json();
            console.log(data);

            if (data.status === "success") {
                setStatus("success");
                setMessage("You're on the list! Check your email for a confirmation.");
                setEmail("");
                setLocation("");
                setCustomLocation("");

                if (onSubmitted) {
                    setTimeout(onSubmitted, 3500);
                }
            } else if (data.status === "error") {
                setStatus("error");
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus("error");
            setMessage("Something went wrong. Please try again later.");
        }

    };

    if (status === "success") {
        return (
            <div className="text-center p-4 rounded-lg bg-[#8CC7A1]/20 text-[#2A4747]">
                <CheckCircle className="mx-auto h-12 w-12 text-[#8CC7A1]" />
                <h3 className="mt-2 text-xl font-semibold">Success!</h3>
                <p>{message}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#2A4747] text-center">
                Join the Waitlist
            </h2>
            <p className="text-[#2A4747]/70 text-center">
                Be the first to know when we launch in LA.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2A4747]/40 h-5 w-5" />
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 border-[#2A4747]/20 focus-visible:ring-[#20A4F3]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="" disabled>
                            Select your city
                        </option>
                        {laCountyCities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                        <option value="Other">Other</option>
                    </select>

                    {location === "Other" && (
                        <Input
                            type='text'
                            placeholder="Enter your city"
                            value={customLocation}
                            onChange={(e) => setCustomLocation(e.target.value)}
                            className="mt-2 border-[#2A4747]/20 focus-visible:ring-[#20A4F3]"
                            required
                        />
                    )}

                </div>
                <Button
                    type="submit"
                    className="w-full bg-[#FE654F] hover:bg-[#FE654F]/90 text-white"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Joining..." : "Join the Waitlist"}
                </Button>
                {status === "error" && (
                    <p className="text-sm text-red-500">{message}</p>
                )}
                <p className="text-xs text-center text-gray-500 pt-2">
                    By joining, you agree to our{" "}
                    <a href="#" className="underline">
                        Terms
                    </a>{" "}
                    &{" "}
                    <a href="#" className="underline">
                        Privacy Policy
                    </a>
                    .
                </p>
            </form>
        </div>
    );
};

export default EmailForm;