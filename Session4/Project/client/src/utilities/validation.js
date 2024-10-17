export const validateIncompatibleOptions = async (
    selectedOptions,
    isConvertible
) => {
    const { roof_id } = selectedOptions;

    // Validate that a valid roof_id is provided
    if (!roof_id) {
        console.error("Invalid or missing roof_id.");
        return "Roof option is not selected.";
    }

    try {
        // Fetch the roof option details from the API
        const response = await fetch(`/api/options/Roof/${roof_id}`);

        // Handle non-successful responses (404, 500, etc.)
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Roof option with ID ${roof_id} not found.`);
            } else {
                throw new Error(
                    `Error fetching roof option details: ${response.statusText}`
                );
            }
        }

        const roofOption = await response.json();

        // Check compatibility based on the roof option properties
        if (isConvertible && roofOption.is_non_convertible_only) {
            return "Selected roof is not compatible with a convertible.";
        }
        if (!isConvertible && roofOption.is_convertible_only) {
            return "Selected roof is only available for convertibles.";
        }

        return null; // No validation errors
    } catch (error) {
        // More detailed error logging and feedback
        console.error(`Error validating options: ${error.message}`);
        return `Error validating roof option: ${error.message}`;
    }
};
