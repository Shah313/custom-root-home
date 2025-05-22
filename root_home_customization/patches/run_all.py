def execute_patch(patch_func):
    try:
        patch_func()
    except Exception as e:
        frappe.log_error(f"Patch {patch_func.__name__} failed: {str(e)}")

def run():
    from . import lead_options
    from . import opportunity_custom_options

    # Add future patches here as needed
    execute_patch(lead_options.run)
    execute_patch(opportunity_custom_options.run)
