from abc import ABC, abstractmethod

from barbershop.domain.enums import AppointmentStatus
from barbershop.domain.exceptions import InvalidStateTransitionError


class AppointmentState(ABC):

    @abstractmethod
    def allowed_transitions(self) -> list:
        pass

    @abstractmethod
    def status(self) -> str:
        pass

    def can_transition_to(self, target_status: str) -> bool:
        return target_status in self.allowed_transitions()

    def transition_to(self, target_status: str) -> str:
        if not self.can_transition_to(target_status):
            raise InvalidStateTransitionError(self.status(), target_status)
        return target_status


class PendingState(AppointmentState):
    def status(self) -> str:
        return AppointmentStatus.PENDING

    def allowed_transitions(self) -> list:
        return [AppointmentStatus.CONFIRMED, AppointmentStatus.CANCELLED]


class ConfirmedState(AppointmentState):
    def status(self) -> str:
        return AppointmentStatus.CONFIRMED

    def allowed_transitions(self) -> list:
        return [AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED]


class CompletedState(AppointmentState):
    def status(self) -> str:
        return AppointmentStatus.COMPLETED

    def allowed_transitions(self) -> list:
        return []


class CancelledState(AppointmentState):
    def status(self) -> str:
        return AppointmentStatus.CANCELLED

    def allowed_transitions(self) -> list:
        return []


STATE_MAP = {
    AppointmentStatus.PENDING: PendingState(),
    AppointmentStatus.CONFIRMED: ConfirmedState(),
    AppointmentStatus.COMPLETED: CompletedState(),
    AppointmentStatus.CANCELLED: CancelledState(),
}


def get_state(status: str) -> AppointmentState:
    state = STATE_MAP.get(status)
    if state is None:
        raise ValueError(f"Estado desconocido: {status}")
    return state
