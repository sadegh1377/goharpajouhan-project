export const employeesMixins = {
    methods: {
        /**
         * this method sanitize the employee Object by
         * changing relation property from farsi to english and
         * combine firstName and lastName to name Property and
         * deleting them.
         * the showBirthdayMenu is used for showing menu that select birthDays.
         */
        sanitizeEmployeeObject(employeeObject) {
            employeeObject.family.forEach((member) => {
                if (member.relation === "همسر") {
                    member.relation = "spouse"
                } else if (member.relation === "فرزند دختر") {
                    member.relation = "daughter"
                } else {
                    member.relation = "son"
                }
                member.name = member.firstName + "-" + member.lastName
                delete member.firstName
                delete member.lastName
                delete member.showBirthdayMenu
            })
            return employeeObject
        }
    },
}