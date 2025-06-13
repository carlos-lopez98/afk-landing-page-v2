import {
    Brain,
    MessageCircle,
    Target,
    Users,
} from "lucide-react";

const HowWeDifferSection = () => {
    const differences = [
        {
            icon: <Users size={32} className="text-[#20A4F3]" />,
            title: "Small Groups Only",
            description: "Max 25 people per event - real conversations, not crowds",
        },
        {
            icon: <Brain size={32} className="text-[#20A4F3]" />,
            title: "AI Friendship Coach",
            description: "Get personalized tips for messaging and event planning",
        },
        {
            icon: <Target size={32} className="text-[#20A4F3]" />,
            title: "Relationship Tracking",
            description: "Build lasting connections with our network management tools",
        },
        {
            icon: <MessageCircle size={32} className="text-[#20A4F3]" />,
            title: "Integrated Messaging",
            description: "No need to switch apps - everything in one place",
        },
    ];

    return (
        <section className="w-full py-16 md:py-24 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2A4747]">
                    How We're Different
                </h2>
                <p className="text-lg md:text-xl text-[#2A4747]/80 max-w-3xl mx-auto mb-12">
                    Unlike Meetup or Eventbrite, we're designed specifically to help you
                    build genuine, lasting friendships.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {differences.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-[#85C7F2]/20">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-[#2A4747] mb-2">
                                {item.title}
                            </h3>
                            <p className="text-[#2A4747]/70">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowWeDifferSection;