const baseTeamMembers = [
    {
        id: 1,
        image: "/assets/images/team/team-v1-img1.jpg",
        alt: "Tim Kick Clean",
        name: "Rian Pratama",
        position: "Founder & Spesialis Sneaker Care",
    },
    {
        id: 2,
        image: "/assets/images/team/team-v1-img2.jpg",
        alt: "Tim Kick Clean",
        name: "Meilin Ardhana",
        position: "Lead Artist Repaint",
    },
    {
        id: 3,
        image: "/assets/images/team/team-v1-img3.jpg",
        alt: "Tim Kick Clean",
        name: "Bagas Wicaksono",
        position: "Teknisi Reglue & Repair",
    },
    {
        id: 4,
        image: "/assets/images/team/team-v1-img4.jpg",
        alt: "Tim Kick Clean",
        name: "Nadia Rahmania",
        position: "Customer Care & Admin",
    },
];

const socialLinks = {
    facebook: "https://www.instagram.com/kickclean.gentan",
    twitter: "https://www.instagram.com/kickclean.gentan",
    pinterest: "https://www.instagram.com/kickclean.gentan",
};

// Team One
export const TeamOneData = baseTeamMembers.map((member) => ({
    ...member,
    ...socialLinks,
}));

// Team Three
export const TeamThreeData = baseTeamMembers.concat(baseTeamMembers).slice(0, 6).map((member, index) => ({
    ...member,
    link: "/team-details",
    ...socialLinks,
    delay: `${(index % 3) * 200}ms`,
    duration: "1500ms",
}));
