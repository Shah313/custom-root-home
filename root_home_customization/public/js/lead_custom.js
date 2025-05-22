function add_drop_lead_button(frm) {
    frm.page.remove_inner_button("Drop Lead", "Create");

    frm.page.add_inner_button("Drop Lead", () => {
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
            frappe.msgprint("✅ Lead marked as Dropped with reason: " + values.drop_reason);
        },
        "Confirm Drop Lead",
        "Drop"
        );
    }, "Create");
}

frappe.ui.form.on('Lead', {
    refresh: function(frm) {
        setTimeout(() => {
            // ❌ Remove Action button
            $('button.btn-default.ellipsis').each(function () {
                if ($(this).closest('.inner-group-button').attr('data-label') === 'Action') {
                    $(this).closest('.inner-group-button').hide();
                }
            });

            // ❌ Remove unwanted Create items
            const unwanted = ["Customer", "Quotation", "Prospect"];
            unwanted.forEach(label => {
                frm.page.remove_inner_button(label, "Create");
            });

            // ✅ Add Drop Lead button
            if (!frm.is_new()) {
                add_drop_lead_button(frm);
            }
        }, 500);
    },

    after_save: function(frm) {
        // ✅ Add Drop Lead after first save (no refresh needed)
        setTimeout(() => {
            add_drop_lead_button(frm);
        }, 500);
    }
});
