import React, { useState } from "react";

const ServiceAccordionItem = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`service-accordion__item${isOpen ? " is-open" : ""}`}>
            <button
                type="button"
                className="service-accordion__header"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="service-accordion__title">{title}</span>
                <span className="service-accordion__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                </span>
            </button>
            <div className="service-accordion__body" style={{ display: isOpen ? "block" : "none" }}>
                <div className="service-accordion__content">{children}</div>
            </div>
        </div>
    );
};

const ServiceAccordion = ({ items, defaultOpenIndex = 0 }) => {
    return (
        <div className="service-accordion">
            {items.map((item, index) => (
                <ServiceAccordionItem
                    key={item.title}
                    title={item.title}
                    defaultOpen={index === defaultOpenIndex}
                >
                    {item.content}
                </ServiceAccordionItem>
            ))}
        </div>
    );
};

export default ServiceAccordion;
