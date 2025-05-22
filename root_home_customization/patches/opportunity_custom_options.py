import frappe

def run():
    execute()

def execute():
    # Desired final list of statuses
    allowed_options = [
        "New",
        "Initial Cell needed",
        "Initial Cell ! In process",
        "Shortlist to view - STC other buyer",
        "Agent arranging access",
        "Viewing arranged",
        "Viewing complete",
        "Negotiating",
        "Higher offer accepted",
        "Closed won",
        "Closed lost",
        "Dropped",
        "Leon hot list initial calls",
        "Pending agents",
        "Open",
        "Quotation",
        "Converted",
        "Lost",
        "Replied",
         "Closed"
    ]

    # Try updating Custom Field first (if it exists)
    custom_field_name = frappe.db.get_value("Custom Field", {
        "dt": "Opportunity",
        "fieldname": "status"
    }, "name")

    if custom_field_name:
        field = frappe.get_doc("Custom Field", custom_field_name)
    else:
        # Fallback to DocField (core ERPNext field)
        field = frappe.get_doc("DocField", {
            "parent": "Opportunity",
            "fieldname": "status"
        })

    # Apply trimmed options and set default to "New"
    field.options = "\n".join(allowed_options)
    field.default = "New"
    field.save()
    frappe.db.commit()

    frappe.logger().info("✅ Updated Opportunity.status options and default to 'New'.")
