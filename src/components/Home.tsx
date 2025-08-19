import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const featureCards = [
	{
		title: "Unified Directory",
		desc: "One searchable home for all innovation and research projects.",
		icon: "/images/hero-image.png",
	},
	{
		title: "Dynamic Roles & Permissions",
		desc: "Granular access tied to positions, not hard-coded user lists.",
		icon: "/images/ur-logo.png",
	},
	{
		title: "Evaluation Dashboard",
		desc: "Reviewers log scores, comments, and decisions in a clear timeline.",
		icon: "",
	},
	{
		title: "Funding Lifecycle",
		desc: "Track funding requests, approvals, received instalments, and spending reports.",
		icon: "",
	},
	{
		title: "Impact Alignment",
		desc: "Link initiatives to SDGs for grant reporting and strategic planning.",
		icon: "",
	},
	{
		title: "Start-up Tracker",
		desc: "Follow campus innovations as they evolve into registered companies.",
		icon: "",
	},
];

const onboardingSteps = [
	{
		step: "1. Sign Up or Log In",
		desc: "Create your account or log in to access the platform.",
	},
	{
		step: "2. Submit a Project",
		desc: "Use the standardized form to lodge new ideas and attach supporting files.",
	},
	{
		step: "3. Assign Contributors",
		desc: "Credit every contributor and link start-ups to parent projects.",
	},
	{
		step: "4. Track Progress & Funding",
		desc: "Monitor project status, funding, and milestones in real time.",
	},
	{
		step: "5. Collaborate & Report",
		desc: "Publish updates, share results, and celebrate achievements.",
	},
];

const Home: React.FC = () => {
	return (
		<section className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-blue-100 px-4 py-12">
			<div className="max-w-6xl w-full text-center flex flex-col gap-12">
				<div className="flex flex-col gap-4 items-center justify-center">
					<h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-2 leading-tight">
						Welcome to KangaLOS
					</h1>
					<p className="text-lg md:text-2xl text-gray-700 mb-4 max-w-2xl">
						The all-in-one platform for managing research projects, student theses,
						community innovations, and externally funded initiatives.{" "}
						<span className="font-bold text-blue-700">
							KangaLOS is an open system—any institution, organization, or team can
							use it to manage and celebrate their projects.
						</span>{" "}
						Discover, track, and celebrate every project from idea to impact.
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Link
							href="login"
							className="px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow-lg hover:bg-blue-800 transition duration-200"
						>
							Explore Projects
						</Link>
						<Link
							href="login"
							className="px-6 py-3 rounded-lg bg-white text-blue-700 border border-blue-700 font-semibold shadow-lg hover:bg-blue-50 transition duration-200"
						>
							Learn More
						</Link>
					</div>
				</div>

				{/* Onboarding Guide */}
				<div className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-3xl flex flex-col gap-6">
					<h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
						Getting Started
					</h2>
					<ul className="space-y-4 text-left">
						{onboardingSteps.map((step) => (
							<li key={step.step} className="flex items-start gap-3">
								<span className="text-blue-700 font-bold text-lg">
									{step.step}
								</span>
								<span className="text-gray-600">{step.desc}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Feature Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
					{featureCards.map((card, index) => (
						<div
							key={card.title}
							className="group bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
							style={{
								animationDelay: `${index * 150}ms`
							}}
						>
							{card.icon ? (
								<img
									src={card.icon}
									alt={card.title}
									className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300"
								/>
							) : (
								<div className="w-16 h-16 mb-4 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
									<svg
										className="w-8 h-8 text-blue-700"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<circle
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="2"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 8v4l3 3"
										/>
									</svg>
								</div>
							)}
							<h3 className="text-xl font-bold text-blue-800 mb-2 group-hover:text-blue-900 transition-colors">
								{card.title}
							</h3>
							<p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors">{card.desc}</p>
						</div>
					))}
				</div>

				{/* Benefits Section */}
				<div className="bg-white rounded-2xl shadow-lg p-8 mx-auto w-full flex flex-col gap-4">
					<h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
						Why Choose KangaLOS?
					</h2>
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
						<li className="mb-2">
							<span className="font-bold text-blue-700">
								Champion originality:
							</span>{" "}
							See past work and push boundaries instead of repeating them.
						</li>
						<li className="mb-2">
							<span className="font-bold text-blue-700">Convince funders:</span>{" "}
							Transparent journeys from idea to impact inspire confidence and
							investment.
						</li>
						<li className="mb-2">
							<span className="font-bold text-blue-700">
								Recognise contributors:
							</span>{" "}
							No author or partner is lost in the paperwork; credit is always
							visible.
						</li>
						<li className="mb-2">
							<span className="font-bold text-blue-700">
								Measure real outcomes:
							</span>{" "}
							Leadership can match resources to results and strategically grow
							areas of excellence.
						</li>
						<li className="mb-2">
							<span className="font-bold text-blue-700">
								Protect institutional knowledge:
							</span>{" "}
							Every file, comment, status change, and financial milestone is
							retained for future students and stakeholders.
						</li>
						<li className="mb-2">
							<span className="font-bold text-blue-700">
								Highlight impact:
							</span>{" "}
							Tag projects against UN SDGs, innovation fields, and categories for
							social-impact reporting.
						</li>
					</ul>
				</div>

				{/* User Guide Section */}
				<div className="bg-white rounded-2xl shadow-xl p-8 mx-auto w-full justify-text-center  gap-4">
					<h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
						User Guide
					</h2>
					<ul className="space-y-3 text-left">
						<li>
							<span className="font-bold text-blue-700">
								Project Submission:
							</span>{" "}
							Use the multi-step wizard to submit new projects, add contributors,
							and upload supporting documents.
						</li>
						<li>
							<span className="font-bold text-blue-700">Collaboration:</span>{" "}
							Invite funders, stakeholders, and partners to join and contribute to
							your project.
						</li>
						<li>
							<span className="font-bold text-blue-700">Evaluation:</span>{" "}
							Reviewers can score, approve, or reject submissions with full audit
							history.
						</li>
						<li>
							<span className="font-bold text-blue-700">Reporting:</span>{" "}
							Publish narrative updates, attach results, and generate living reports
							for continuous improvement.
						</li>
						<li>
							<span className="font-bold text-blue-700">Impact Tracking:</span>{" "}
							Visualize progress and measure impact with dashboards and SDG
							alignment.
						</li>
						<li>
							<span className="font-bold text-blue-700">Search & Filter:</span>{" "}
							Find projects by field, year, unit, funder, status, or keyword.
						</li>
					</ul>
				</div>

				{/* Credit Section */}
				<div className="bg-blue-50 rounded-2xl shadow-lg p-6 mx-auto max-w-3xl flex flex-col items-center mt-8 border border-blue-200">
					<div className="flex items-center gap-3 mb-2">
						<img src="/images/ur-logo.png" alt="Binaryhub" className="w-10 h-10 rounded-full border border-blue-300" />
						<span className="text-lg font-semibold text-blue-800">KangaLOS Team @ Binaryhub</span>
					</div>
					<p className="text-gray-700 text-center text-base mb-2">
						Built and maintained by the <span className="font-bold text-blue-700">KangaLOS Team</span>, members of                         <a
                            href="http://urbinaryhub.rw/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-blue-700"
                        >
                            <span> UR Binary Hub  </span> 
                            <ExternalLink className="h-3 w-3" />
                        </a> rooted in the University of Rwanda. This platform is designed for all institutions—any organization can use KangaLOS to manage and celebrate their projects, not just those from the University of Rwanda.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Home;