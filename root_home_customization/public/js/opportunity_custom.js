function add_drop_lead_button_opportunity(frm) {
    // Add the "Drop Opportunity" button under "Create"
    frm.page.add_inner_button("Drop Opportunity", () => {
        const drop_options = [
            "Failed Room Sizings",
            "Failed Pricing",
            "Modern Auction",
            "Sold",
            "Tenanted",
            "Failed Soft Checks",
            "Serco cut off reached",
            "Offers well over asking",
            "Failed PCC Checks",
            "Area on hold",
            "Change of Circumstance",
            "Article 4 Area",
            "Failed too much work",
            "Duplicate Record",
            "STC/Under Offer",
            "Withdrawn From Market",
            "Failed Location",
            "Vendor Challenges",
            "Failed Layout",
            "Failed Agent",
            "No urgency",
            "Conservation area:Windows",
            "Cant sub let",
            "None standard Construction",
            "Below min GIA",
            "Agent Impossible",
            "Corporate sales",
            "Vendor now renting it out",
            "Already Submitted"
        ];

        frappe.prompt([
            {
                label: "Select Drop Reason",
                fieldname: "drop_reason",
                fieldtype: "Select",
                reqd: 1,
                options: drop_options.join('\n')
            }
        ],
        (values) => {
            frm.set_value("status", "Dropped");
            frm.set_value("custom_dropped_reason", values.drop_reason);
            frm.save();
            frappe.msgprint("✅ Opportunity marked as Dropped with reason: " + values.drop_reason);
        },
        "Confirm Drop Opportunity",
        "Drop"
        );
    }, "Create");
}

frappe.ui.form.on('Opportunity', {
    refresh: function(frm) {
        if (!frm.is_new()) {
            add_drop_lead_button_opportunity(frm);
        }
    },
    after_save: function(frm) {
        add_drop_lead_button_opportunity(frm);
    }
});
