import { useCallback, useEffect, useMemo, useState } from "react";
import { buildPricingOptions, servicesCatalog } from "@/data/service";
import { fetchServiceDetail, fetchServices } from "@/lib/servicesApi";

export const useServicesData = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadServices = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchServices();
            const normalized = Array.isArray(data) ? data : [];
            setServices(normalized.length ? normalized : servicesCatalog);
        } catch (err) {
            setError(err?.message || "Gagal memuat layanan");
            setServices(servicesCatalog);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    const pricingOptions = useMemo(() => buildPricingOptions(services), [services]);

    const addServiceDetail = useCallback((svc) => {
        if (!svc || !svc._id) return;
        setServices((prev) => {
            if (prev.find((item) => item._id === svc._id)) return prev;
            return [...prev, svc];
        });
    }, []);

    const isObjectId = (value) => typeof value === "string" && /^[a-fA-F0-9]{24}$/.test(value);

    const ensureServiceById = useCallback(
        async (id) => {
            if (!id) return null;
            if (!isObjectId(id)) return null;
            const existing = services.find((item) => item._id === id);
            if (existing) return existing;

            try {
                const detail = await fetchServiceDetail(id);
                if (detail) addServiceDetail(detail);
                return detail;
            } catch (err) {
                setError((prev) => prev || err?.message || "Gagal mengambil detail layanan");
                return null;
            }
        },
        [addServiceDetail, services]
    );

    return {
        services,
        pricingOptions,
        loading,
        error,
        reload: loadServices,
        ensureServiceById,
    };
};
