export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  deck: string;
  heroImage: string;
  heroAlt: string;
  accent: string;
  content: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: "solar-skyline",
    title: "Solar skyline plans are reshaping the city after dark",
    category: "Cities",
    readTime: "6 min read",
    publishedAt: "May 18, 2026",
    author: "Ari Sol",
    deck:
      "A new wave of night-ready urban design is turning rooftops, facades, and transit hubs into glowing public landmarks.",
    heroImage:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "City skyline with glowing building facades at night",
    accent: "from-cyan-400 via-sky-500 to-indigo-500",
    content: [
      {
        heading: "The glow is becoming infrastructure",
        paragraphs: [
          "For years, the city lights after dusk were treated like a visual afterthought — a mix of signage, traffic, and decorative municipal glow. But that logic is shifting. Civic planners and private developers are now treating illumination as a functional layer of the urban grid, using it to improve safety, direct movement, and create a stronger visual identity after sunset.",
          "The result is a new kind of skyline: one that glows in layered gradients instead of one-note brightness. Rooftop solar skins, smart façade systems, and illuminated public paths are being designed together so the city reads like a coherent three-dimensional scene rather than a disconnected set of points of light."
        ]
      },
      {
        heading: "Design is becoming more tactile",
        paragraphs: [
          "What makes the shift notable is not just how much light is used, but how it is composed. Designers are leaning into warm edges, softened reflections, and shadowed voids. The target is less a floodlight effect and more a spatial atmosphere — one that feels immersive, walkable, and expressive without dominating the street.",
          "The most successful examples do not look like stadium lighting. They read more like sculpture. Light becomes a way to define edges, terraces, and gathering spaces, bringing a sense of depth to plazas and boulevards that once felt flat at night."
        ]
      },
      {
        heading: "A softer digital future",
        paragraphs: [
          "This also fits a broader human-centered urban trend. People are not asking for brighter cities alone; they are asking for cities that feel legible, comforting, and alive. That has encouraged teams to pair illuminated architecture with sensor-driven controls, adaptive dimming, and renewable energy systems so the experience remains both dramatic and efficient."
        ]
      }
    ]
  },
  {
    id: 2,
    slug: "studio-noise",
    title: "The quiet power of studio noise in an overstimulated world",
    category: "Culture",
    readTime: "4 min read",
    publishedAt: "May 16, 2026",
    author: "Leah Carter",
    deck:
      "In creative circles, ambient sound is starting to matter as much as the camera, the typeface, or the final edit.",
    heroImage:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Studio equipment and creative workspace with warm lighting",
    accent: "from-amber-300 via-orange-500 to-rose-500",
    content: [
      {
        heading: "Sound as atmosphere",
        paragraphs: [
          "The modern creative workspace is rarely quiet. But the idea of noise is changing. Rather than being a nuisance, a carefully selected sound environment can become part of the emotional architecture of the work itself.",
          "From lo-fi house loops to the texture of a room tone, sound carries clues about pace, mood, and intention. Designers and editors alike are discovering that ambience can sharpen focus without flaring into distraction."
        ]
      },
      {
        heading: "Making space for texture",
        paragraphs: [
          "This trend is especially visible in visual culture, where the ghost of analog process is coming back as a preference rather than a nostalgia move. Tape hiss, room tone, and imperfect mechanical rhythms now feel like points of authenticity in a world that is often hyper-polished.",
          "The result is not a rejection of digital tools; it is a more layered relationship to them. The textures of craft are returning as deliberate design choices, helping work feel more human, more present, and more alive."
        ]
      }
    ]
  },
  {
    id: 3,
    slug: "micro-mobility",
    title: "Micro-mobility is becoming a social ritual, not just a transit tool",
    category: "Mobility",
    readTime: "5 min read",
    publishedAt: "May 12, 2026",
    author: "Rafael Quinn",
    deck:
      "The next generation of urban movement is designed around frictionless social presence, not just speed.",
    heroImage:
      "https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Electric scooter riders moving through a modern city street",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    content: [
      {
        heading: "The ride is part of the public experience",
        paragraphs: [
          "Micromobility has been marketed as a faster way to move through dense urban areas, but it is increasingly functioning as a public ritual. Riders are not only commuting; they are sharing space, occupying street corners, and creating a new kind of daily choreography in public life.",
          "That has influenced how companies design equipment, routes, and parking systems. The most successful products feel less like isolated gadgets and more like invisible extension of a neighborhood’s rhythm."
        ]
      },
      {
        heading: "Form and friction",
        paragraphs: [
          "The subtle but important shift is that users expect movement systems to feel expressive. Compact vehicles now carry softer materials, cleaner silhouettes, and clearer cues for social awareness. Space around them is being treated like an interface too, not just a lane or a stop.",
          "Cities that succeed here design for human flow instead of vehicle throughput alone. The result is street life that feels more composed, slower, and more generous."
        ]
      }
    ]
  },
  {
    id: 4,
    slug: "memory-objects",
    title: "The objects we keep are becoming memory engines",
    category: "Design",
    readTime: "7 min read",
    publishedAt: "May 9, 2026",
    author: "Noor Haddad",
    deck:
      "A new design language is turning everyday objects into storytelling tools that hold emotion as well as function.",
    heroImage:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Curated home objects arranged in a warm minimalist room",
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
    content: [
      {
        heading: "Objects with narrative intent",
        paragraphs: [
          "In the most thoughtful homes, objects are no longer treated as neutral furnishings. They are chosen for what they tell you about a life: an object’s material, patching, wear, and arrangement all create a narrative without saying it out loud.",
          "This idea is expanding beyond home interiors. Designers are creating more objects for work, gifting, and daily rituals with an understanding that they should hold emotional context, not just serve a practical function."
        ]
      },
      {
        heading: "A slower relationship to ownership",
        paragraphs: [
          "The rise of memory-rich design reflects a larger cultural turn away from pure optimization. Customers are becoming more interested in durable objects that accrue personality. These pieces are less about perfection and more about continuity — a quiet archive of lived experience."
        ]
      }
    ]
  },
  {
    id: 5,
    slug: "wellness-algorithm",
    title: "Wellness apps are learning to listen without becoming loud",
    category: "Tech",
    readTime: "5 min read",
    publishedAt: "May 5, 2026",
    author: "Mila Foster",
    deck:
      "The best digital wellness products are becoming more collaborative, ambient, and less performative.",
    heroImage:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Person using a wellness app on a device with a soft ambient interface",
    accent: "from-pink-400 via-purple-500 to-indigo-500",
    content: [
      {
        heading: "Less guidance, more trust",
        paragraphs: [
          "The wellness app market has been crowded with hard-edged prompts and aggressive data dashboards. The next wave is softer and better aligned with real human rhythms. Designers are building systems that suggest, listen, and adapt without constantly interrupting the user.",
          "The core insight is simple: users do not want more productivity in the name of health. They want tools that help them feel more grounded, more aware, and less judged."
        ]
      },
      {
        heading: "Ambient intelligence",
        paragraphs: [
          "A well-designed wellness experience often feels almost invisible. It nudges gently, responds to context, and avoids exacting perfection. That shift matters because people are more likely to return to a system that respects their reality instead of demanding a perfect version of it."
        ]
      }
    ]
  }
];

export const featuredNews = newsItems[0];
