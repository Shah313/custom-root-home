import frappe

def run():
    execute()

def execute():
    # Desired final list of statuses
    allowed_options = [
        "Lead",
        "Opportunity",
        "Dropped",
        "New",
        "Local Authority Setup",
        "A4 check complete",
        "Room size check Complete",
        "RP-Check Complete",
        "Offers linked",
        "Refurb estimate complete",
        "Comparables complete",
        "Costing complete"
        
    ]

    # Try updating Custom Field first (if it exists)
    custom_field_name = frappe.db.get_value("Custom Field", {
        "dt": "Lead",
        "fieldname": "status"
    }, "name")

    if custom_field_name:
        field = frappe.get_doc("Custom Field", custom_field_name)
    else:
        # Fallback to DocField (core ERPNext field)
        field = frappe.get_doc("DocField", {
            "parent": "Lead",
            "fieldname": "status"
        })

    # Apply trimmed options
    field.options = "\n".join(allowed_options)
    field.save()
    frappe.db.commit()
    frappe.logger().info("✅ Updated Lead.status options to trimmed custom list.")
