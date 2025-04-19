import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, PhoneCall, MessageCircle, Facebook, Video, CreditCard, Filter, X } from "lucide-react";

const skillsList = [
  {
    id: 1,
    name: "Tailoring",
    user: "Chisomo Banda",
    description: "Expert in sewing dresses and school uniforms.",
    rating: 4,
    contact: {
      phone: "265991234567",
      whatsapp: "265991234567",
      social: "https://facebook.com/chisomo.banda"
    },
    image: "",
    showcase: [],
    payment: "Airtel Money"
  },
  {
    id: 2,
    name: "Welding",
    user: "Patrick Mvula",
    description: "Door and window frame welding.",
    rating: 5,
    contact: {
      phone: "265998765432",
      whatsapp: "265998765432",
      social: "https://facebook.com/patrick.mvula"
    },
    image: "",
    showcase: [],
    payment: "TNM Mpamba"
  },
  {
    id: 3,
    name: "Tutoring",
    user: "Linda Jere",
    description: "Math and English tutoring for primary students.",
    rating: 5,
    contact: {
      phone: "265997654321",
      whatsapp: "265997654321",
      social: "https://facebook.com/linda.jere"
    },
    image: "",
    showcase: [],
    payment: "Cash"
  },
];

const initialSkill = {
  id: 0,
  name: "",
  user: "",
  description: "",
  rating: 0,
  contact: {
    phone: "",
    whatsapp: "",
    social: ""
  },
  image: "",
  showcase: [],
  payment: ""
};

export default function MzangaApp() {
  const [skills, setSkills] = useState(skillsList);
  const [newSkill, setNewSkill] = useState({ ...initialSkill });
  const [filter, setFilter] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const addSkill = () => {
    if (!newSkill.name || !newSkill.user || !newSkill.description) return;
    setSkills([...skills, { ...newSkill, id: skills.length + 1 }]);
    setNewSkill({ ...initialSkill });
    setIsAddingSkill(false);
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(filter.toLowerCase()) ||
    skill.user.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center text-white">Mzanga - Skills Exchange</h1>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter by Skill or Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white"
        />
        <Filter size={20} className="text-gray-400" />
        <Button onClick={() => setIsAddingSkill(!isAddingSkill)} className="ml-auto">
          {isAddingSkill ? "Hide Form" : "Add Skill"}
        </Button>
      </div>

      {isAddingSkill && (
        <div className="p-4 border rounded-xl shadow-md bg-gray-800">
          <h3 className="text-xl font-medium mb-2 text-white">Add Your Skill</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addSkill();
            }}
          >
            <Input
              placeholder="Your Name"
              value={newSkill.user}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, user: e.target.value }))}
              className="mb-2"
            />
            <Input
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
              className="mb-2"
            />
            <Textarea
              placeholder="Brief Description"
              value={newSkill.description}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, description: e.target.value }))}
              className="mb-2"
            />
            <Input
              placeholder="Phone Number"
              value={newSkill.contact.phone}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))}
              className="mb-2"
            />
            <Input
              placeholder="WhatsApp Number"
              value={newSkill.contact.whatsapp}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, contact: { ...prev.contact, whatsapp: e.target.value } }))}
              className="mb-2"
            />
            <Input
              placeholder="Social Media Link"
              value={newSkill.contact.social}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, contact: { ...prev.contact, social: e.target.value } }))}
              className="mb-2"
            />
            <Input
              placeholder="Profile Picture URL"
              value={newSkill.image}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, image: e.target.value }))}
              className="mb-2"
            />
            <Textarea
              placeholder="Showcase Image URLs (comma-separated)"
              value={newSkill.showcase.join(",")}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, showcase: e.target.value.split(",") }))}
              className="mb-2"
            />
            <Input
              placeholder="Preferred Payment Method (e.g., Cash, Airtel Money, TNM Mpamba)"
              value={newSkill.payment}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, payment: e.target.value }))}
              className="mb-2"
            />
            <Input
              placeholder="Rating (1 to 5)"
              type="number"
              min={1}
              max={5}
              value={newSkill.rating}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, rating: parseInt(e.target.value) }))}
              className="mb-4"
            />
            <Button type="submit">Post Skill</Button>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {filteredSkills.map((skill) => (
          <Card key={skill.id} className="bg-gray-800 text-white relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => deleteSkill(skill.id)}
            >
              <X size={16} />
            </Button>
            <CardContent className="p-4">
              {skill.image && (
                <img src={skill.image} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-2" />
              )}
              <h2 className="text-xl font-semibold">{skill.name}</h2>
              <p className="text-sm text-gray-300">By: {skill.user}</p>
              <p className="mt-2 text-gray-200">{skill.description}</p>
              <div className="flex items-center mt-2 text-yellow-500">
                {Array.from({ length: skill.rating }).map((_, i) => (
                  <Star key={i} size={16} />
                ))}
              </div>
              <div className="mt-4 text-sm space-y-1">
                <p className="flex items-center gap-1">
                  <PhoneCall size={16} />
                  <a href={`tel:${skill.contact.phone}`} className="text-blue-400">{skill.contact.phone}</a>
                </p>
                <p className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  <a href={`https://wa.me/${skill.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-400">WhatsApp</a>
                </p>
                <p className="flex items-center gap-1">
                  <Facebook size={16} />
                  <a href={skill.contact.social} target="_blank" rel="noopener noreferrer" className="text-blue-500">Social</a>
                </p>
                <p className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  <a href={`sms:${skill.contact.phone}`} className="text-purple-400">Text</a>
                </p>
                <p className="flex items-center gap-1">
                  <PhoneCall size={16} />
                  <a href={`tel:${skill.contact.phone}`} className="text-orange-400">Call</a>
                </p>
                <p className="flex items-center gap-1">
                  <Video size={16} />
                  <a href={`https://wa.me/${skill.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-red-400">Video Call</a>
                </p>
                <p className="flex items-center gap-1">
                  <CreditCard size={16} />
                  <span className="text-teal-400">{skill.payment}</span>
                </p>
              </div>
              {skill.showcase.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {skill.showcase.map((url, idx) => (
                    <img key={idx} src={url} alt="Work Sample" className="w-full h-24 object-cover rounded-lg" />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
