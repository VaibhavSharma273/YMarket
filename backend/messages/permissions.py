from rest_framework import permissions

class IsInThread(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Permissions are only allowed to a user in the conversation.
        return request.user == obj.sender or request.user == obj.receiver