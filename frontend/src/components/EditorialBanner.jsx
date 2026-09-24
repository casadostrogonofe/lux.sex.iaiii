import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchEditorialBanners } from "../sanity/editorialBanners";
import { fetchEditorsBySection } from "../sanity/people";
import { fallbackEditors } from "../mock/mockData";
import { EditorialBannerCarousel } from "./editorial/EditorialBannerCarousel";
import { EditorReelGrid } from "./editorial/EditorReelGrid";

const EditorialBanner = ({ section, showEditors = true }) => {
  const { t } = useTranslation();
  const [editors, setEditors] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setBanners([]);
    setEditors([]);
    Promise.all([fetchEditorialBanners(section), fetchEditorsBySection(section)])
      .then(([bannerItems, editorItems]) => {
        if (!active) return;
        setBanners(bannerItems || []);
        setEditors(
          editorItems.length > 0 ? editorItems : fallbackEditors[section] || [],
        );
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setBanners([]);
        setEditors(fallbackEditors[section] || []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [section]);

  const slides = useMemo(() => {
    const legacy = editors
      .filter((editor) => editor.banner)
      .map((editor) => ({
        id: `editor-${editor._id || editor.id}`,
        image: editor.banner,
        alt: editor.name || "Banner editorial",
        title: editor.name || "",
        eyebrow: editor.role || "",
        href: editor.instagram || null,
      }));
    return [...banners, ...legacy];
  }, [banners, editors]);

  return (
    <div data-testid={`editorial-banner-${section}`}>
      <EditorialBannerCarousel section={section} slides={slides} loading={loading} />
      {showEditors && <EditorReelGrid editors={editors} label={t("editorial.editors")} />}
    </div>
  );
};

export default EditorialBanner;