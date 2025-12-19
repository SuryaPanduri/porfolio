import React from 'react';

export default function ProjectCard({p}){
  return (
    <div className="border rounded p-4 bg-white">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="text-sm mt-2">{p.shortDesc}</p>
      <p className="text-xs font-mono mt-3">{(p.tech || []).join(' · ')}</p>
      <div className="mt-3 flex gap-3">
        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-sm underline">Live</a>}
        {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-sm underline">Code</a>}
      </div>
    </div>
  );
}